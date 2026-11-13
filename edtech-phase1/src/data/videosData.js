// ===== DỮ LIỆU VIDEO BÀI GIẢNG =====
// Có thể đăng video trực tiếp từ Trang cá nhân (Admin) → tab "Đăng video",
// hoặc thêm thủ công vào mảng `videos` bên dưới.
//
// Trường bắt buộc mỗi bài:
//   id       : mã duy nhất, không dấu, không cách (vd: "toan10_bpt_01")
//   title    : tên bài giảng (vd: "Bài 1: Bất phương trình bậc nhất 2 ẩn")
//   tags     : mảng nhãn lọc: "Toán","Lý","Hóa","Tin","Lớp 10","Lớp 11","Lớp 12","HSA","TSA"
//   source   : "youtube" | "drive" | "local"
//   cover    : ảnh bìa (vd: "/video-covers/ten-anh.jpg" hoặc link https://...)
//   và tuỳ theo source:
//     youtube -> youtubeId: "dQw4w9WgXcQ"
//     drive   -> driveId  : "1AbCdEf..."
//     local   -> file     : "/videos/ten-video.mp4"
//
// Trường tuỳ chọn để sắp xếp theo Khóa học → Chương → Bài:
//   course      : tên khóa học (vd: "Toán 10 — Đại số & Bất phương trình")
//   chapter     : tên chương / chuyên đề (vd: "Chương 2: Bất phương trình bậc nhất 2 ẩn")
//   order       : số thứ tự sắp xếp (vd: 1, 2, 3...)
//   teacher     : giảng viên
//   duration    : thời lượng (vd: "42:30")
//   description : mô tả nội dung bài học
//   docUrl      : link tài liệu PDF / Google Drive đính kèm
//   docName     : tên file tài liệu
//   quizUrl     : link bài kiểm tra liên quan
//   quizTitle   : tên bài kiểm tra liên quan
//   parts       : mảng các phần video nếu bài có nhiều phần [{ name, source, youtubeId|driveId|file, duration }]

export const videoFilters = [
  { group: "Môn học", items: ["Toán", "Lý", "Hóa", "Tin"] },
  { group: "Lớp", items: ["Lớp 10", "Lớp 11", "Lớp 12"] },
  { group: "Kỳ thi", items: ["HSA", "TSA"] },
];

export const videos = [];

const SUBJECT_TAGS = ["Toán", "Lý", "Hóa", "Tin", "HSA", "TSA"];

function sortByOrder(a, b) {
  const oa = Number(a.order);
  const ob = Number(b.order);
  const hasA = Number.isFinite(oa) && oa > 0;
  const hasB = Number.isFinite(ob) && ob > 0;
  if (hasA && hasB && oa !== ob) return oa - ob;
  if (hasA !== hasB) return hasA ? -1 : 1;
  return (a.createdAt || 0) - (b.createdAt || 0);
}

/** Chuẩn hoá 1 bản ghi video thành bài giảng có đủ parts, docs và quiz. */
export function normalizeLesson(raw) {
  const parts = Array.isArray(raw.parts) && raw.parts.length > 0
    ? raw.parts.filter((p) => p && (p.youtubeId || p.driveId || p.file))
    : [{
        name: raw.partLabel || "Video bài giảng",
        source: raw.source,
        youtubeId: raw.youtubeId || "",
        driveId: raw.driveId || "",
        file: raw.file || "",
        duration: raw.duration || "",
      }];

  const docs = Array.isArray(raw.docs) && raw.docs.length > 0
    ? raw.docs
    : raw.docUrl
      ? [{ name: raw.docName || "Tài liệu bài học", url: raw.docUrl, type: "Tài liệu" }]
      : [];

  const quiz = raw.quiz && raw.quiz.url
    ? raw.quiz
    : raw.quizUrl
      ? {
          title: raw.quizTitle || "Làm bài kiểm tra liên quan",
          url: raw.quizUrl,
          questions: raw.quizQuestions || null,
          minutes: raw.quizMinutes || null,
        }
      : null;

  return {
    ...raw,
    parts: parts.length ? parts : [{ name: "Video bài giảng", source: raw.source }],
    docs,
    quiz,
  };
}

/** Gom danh sách video thành cấu trúc Khóa học → Chương → Bài giảng. */
export function groupVideosIntoCourses(rawVideos = []) {
  const courseMap = new Map();

  for (const item of rawVideos) {
    const lesson = normalizeLesson(item);
    const subjectTag = (lesson.tags || []).find((t) => SUBJECT_TAGS.includes(t));
    const courseTitle = (lesson.course || "").trim() || (subjectTag ? `Bài giảng ${subjectTag}` : "Bài giảng tổng hợp");
    const chapterTitle = (lesson.chapter || "").trim() || "Danh sách bài giảng";

    if (!courseMap.has(courseTitle)) {
      courseMap.set(courseTitle, {
        id: courseTitle,
        title: courseTitle,
        cover: lesson.cover || "",
        teacher: lesson.teacher || "",
        tags: [],
        latestAt: lesson.createdAt || 0,
        chapterMap: new Map(),
      });
    }

    const course = courseMap.get(courseTitle);
    if (!course.cover && lesson.cover) course.cover = lesson.cover;
    if (!course.teacher && lesson.teacher) course.teacher = lesson.teacher;
    if ((lesson.createdAt || 0) > course.latestAt) course.latestAt = lesson.createdAt || 0;
    for (const tag of lesson.tags || []) {
      if (!course.tags.includes(tag)) course.tags.push(tag);
    }

    if (!course.chapterMap.has(chapterTitle)) {
      course.chapterMap.set(chapterTitle, []);
    }
    course.chapterMap.get(chapterTitle).push(lesson);
  }

  return Array.from(courseMap.values()).map((course) => {
    const chapters = Array.from(course.chapterMap.entries())
      .map(([title, lessons]) => {
        const sorted = [...lessons].sort(sortByOrder);
        return {
          id: `${course.id}::${title}`,
          title,
          lessons: sorted,
          firstOrder: sorted[0]?.order || 0,
          firstCreatedAt: sorted[0]?.createdAt || 0,
        };
      })
      .sort((a, b) => sortByOrder({ order: a.firstOrder, createdAt: a.firstCreatedAt }, { order: b.firstOrder, createdAt: b.firstCreatedAt }));

    const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    return {
      id: course.id,
      title: course.title,
      cover: course.cover,
      teacher: course.teacher || "Bảo Minh",
      tags: course.tags,
      latestAt: course.latestAt,
      totalLessons,
      chapters,
    };
  });
}
