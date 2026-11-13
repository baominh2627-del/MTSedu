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

export const videos = [
  {
    id: "phys12_cautruc_p1",
    title: "VẬT LÝ 12 - CẤU TRÚC CỦA CHẤT, SỰ CHUYỂN THỂ - Phần 1",
    course: "Vật Lý 12 — Chương trình mới",
    chapter: "Chương 1: Vật lý nhiệt",
    order: 2,
    tags: ["Lý", "Lớp 12"],
    source: "youtube",
    youtubeId: "CX8Img1_-9Y",
    cover: "https://i.ytimg.com/vi/CX8Img1_-9Y/maxresdefault.jpg",
    teacher: "Bảo Minh",
    duration: "24:32",
    createdAt: 1794038400000,
  },
  {
    id: "phys12_canbangnhiet_b1",
    title: "BUỔI 1: ÔN TẬP BT CÂN BẰNG NHIỆT - PHẦN 1",
    course: "Vật Lý 12 — Chương trình mới",
    chapter: "Chương 1: Vật lý nhiệt",
    order: 1,
    tags: ["Lý", "Lớp 12"],
    source: "youtube",
    youtubeId: "0bLIbcd-3ss",
    cover: "https://i.ytimg.com/vi/0bLIbcd-3ss/maxresdefault.jpg",
    teacher: "Bảo Minh",
    duration: "1:28:57",
    createdAt: 1793520000000,
  },
  {
    id: "phys12_cautruc_b3",
    title: "BUỔI 3 - LÝ THUYẾT: CẤU TRÚC CỦA CHẤT, SỰ CHUYỂN THỂ - PHẦN 1",
    course: "Vật Lý 12 — Chương trình mới",
    chapter: "Chương 1: Vật lý nhiệt",
    order: 3,
    tags: ["Lý", "Lớp 12"],
    source: "youtube",
    youtubeId: "5Srp9E9dTPE",
    cover: "https://i.ytimg.com/vi/5Srp9E9dTPE/maxresdefault.jpg",
    teacher: "Bảo Minh",
    duration: "41:25",
    createdAt: 1793606400000,
  },
  {
    id: "phys12_maxwell",
    title: "VẬT LÝ 12 PHƯƠNG TRÌNH MAXWELL - SÓNG ĐIỆN TỪ",
    course: "Vật Lý 12 — Chương trình mới",
    chapter: "Từ trường & Sóng điện từ",
    order: 4,
    tags: ["Lý", "Lớp 12"],
    source: "youtube",
    youtubeId: "SzyJ_PxFeqQ",
    cover: "https://i.ytimg.com/vi/SzyJ_PxFeqQ/maxresdefault.jpg",
    teacher: "Bảo Minh",
    duration: "44:02",
    createdAt: 1794034800000,
  },
  {
    id: "phys12_ontap_gk1",
    title: "VẬT LÝ 12 - ÔN TẬP GIỮA HỌC KÌ I - DỰ ĐOÁN",
    course: "Vật Lý 12 — Chương trình mới",
    chapter: "Ôn tập Giữa Học Kì I",
    order: 5,
    tags: ["Lý", "Lớp 12"],
    source: "youtube",
    youtubeId: "jckxDJ-qYl4",
    cover: "https://i.ytimg.com/vi/jckxDJ-qYl4/maxresdefault.jpg",
    teacher: "Bảo Minh",
    duration: "1:55:41",
    createdAt: 1793602800000,
  },
  {
    id: "math12_ontap_hk1_p1",
    title: "TOÁN 12 - Ôn Tập HKI - Phần 1",
    course: "Toán 12 — Ôn tập Học Kì I",
    chapter: "Ôn tập Học Kì I",
    order: 1,
    tags: ["Toán", "Lớp 12"],
    source: "youtube",
    youtubeId: "YvsT00QVBUg",
    cover: "https://i.ytimg.com/vi/YvsT00QVBUg/maxresdefault.jpg",
    teacher: "Bảo Minh",
    duration: "1:50:22",
    createdAt: 1794036600000,
  },
  {
    id: "phys10_live_gk1_b1",
    title: "LIVE - BUỔI 1 - ÔN TẬP GIỮA HỌC KÌ I - VẬT LÝ 10",
    course: "Vật Lý 10 — Ôn tập Giữa Học Kì I",
    chapter: "Ôn tập Giữa Học Kì I",
    order: 1,
    tags: ["Lý", "Lớp 10"],
    source: "youtube",
    youtubeId: "xbYTVUcfX4w",
    cover: "https://i.ytimg.com/vi/xbYTVUcfX4w/maxresdefault.jpg",
    teacher: "Bảo Minh",
    duration: "1:19:40",
    createdAt: 1793516400000,
  },
  {
    id: "phys10_live_gk1_b2",
    title: "LIVE - BUỔI 2 - ÔN TẬP GIỮA HỌC KÌ I - VẬT LÝ 10",
    course: "Vật Lý 10 — Ôn tập Giữa Học Kì I",
    chapter: "Ôn tập Giữa Học Kì I",
    order: 2,
    tags: ["Lý", "Lớp 10"],
    source: "youtube",
    youtubeId: "7QdYHA1CAyE",
    cover: "https://i.ytimg.com/vi/7QdYHA1CAyE/maxresdefault.jpg",
    teacher: "Bảo Minh",
    duration: "55:09",
    createdAt: 1793599200000,
  },
];

const SUBJECT_TAGS = ["Toán", "Lý", "Hóa", "Tin", "HSA", "TSA"];
export const STATIC_VIDEO_IDS = new Set(videos.map((v) => v.id));

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

function normalizeDeclaredChapters(chapters) {
  if (!Array.isArray(chapters)) return [];
  return chapters.map((c) => String(c || "").trim()).filter(Boolean);
}

/** Gom danh sách khóa học (courses trên Firebase) và video thành cấu trúc Khóa học → Chương → Bài giảng. */
export function groupVideosIntoCourses(rawVideos = [], rawCourses = []) {
  const courseMap = new Map();
  const byDbId = new Map();
  const byTitleLower = new Map();

  for (const c of rawCourses || []) {
    const title = (c?.title || "").trim();
    if (!title || !c?.id) continue;
    const explicitTags = Array.isArray(c.tags) ? c.tags.filter(Boolean) : [];
    const entry = {
      id: c.id,
      dbId: c.id,
      _fromDb: true,
      title,
      sourceTitle: (c.sourceTitle || "").trim(),
      cover: (c.cover || "").trim(),
      hasExplicitCover: Boolean((c.cover || "").trim()),
      teacher: (c.teacher || "").trim(),
      description: (c.description || "").trim(),
      tags: [...explicitTags],
      hasExplicitTags: explicitTags.length > 0,
      declaredChapters: normalizeDeclaredChapters(c.chapters),
      latestAt: c.updatedAt || c.createdAt || 0,
      createdAt: c.createdAt || 0,
      chapterMap: new Map(),
      hasStaticLessons: false,
      firebaseVideoIds: [],
    };
    courseMap.set(entry.id, entry);
    byDbId.set(entry.id, entry);
    const titleKey = title.toLowerCase();
    if (!byTitleLower.has(titleKey)) byTitleLower.set(titleKey, entry);
    if (entry.sourceTitle) {
      const sourceKey = entry.sourceTitle.toLowerCase();
      if (!byTitleLower.has(sourceKey)) byTitleLower.set(sourceKey, entry);
    }
  }

  for (const item of rawVideos) {
    const lesson = normalizeLesson(item);
    const subjectTag = (lesson.tags || []).find((t) => SUBJECT_TAGS.includes(t));
    const rawCourseTitle = (lesson.course || "").trim();
    const fallbackTitle = rawCourseTitle || (subjectTag ? `Bài giảng ${subjectTag}` : "Bài giảng tổng hợp");
    const chapterTitle = (lesson.chapter || "").trim() || "Danh sách bài giảng";

    let course = (lesson.courseId && byDbId.get(lesson.courseId))
      || (rawCourseTitle && byTitleLower.get(rawCourseTitle.toLowerCase()))
      || byTitleLower.get(fallbackTitle.toLowerCase());

    if (!course) {
      course = {
        id: fallbackTitle,
        dbId: null,
        _fromDb: false,
        title: fallbackTitle,
        sourceTitle: fallbackTitle,
        cover: lesson.cover || "",
        hasExplicitCover: false,
        teacher: lesson.teacher || "",
        description: "",
        tags: [],
        hasExplicitTags: false,
        declaredChapters: [],
        latestAt: lesson.createdAt || 0,
        createdAt: lesson.createdAt || 0,
        chapterMap: new Map(),
        hasStaticLessons: false,
        firebaseVideoIds: [],
      };
      courseMap.set(course.id, course);
      byTitleLower.set(fallbackTitle.toLowerCase(), course);
    }

    if (item._static || STATIC_VIDEO_IDS.has(lesson.id)) {
      course.hasStaticLessons = true;
    } else if (lesson.id) {
      course.firebaseVideoIds.push(lesson.id);
    }

    if (!course.cover && lesson.cover) course.cover = lesson.cover;
    if (!course.teacher && lesson.teacher) course.teacher = lesson.teacher;
    if ((lesson.createdAt || 0) > course.latestAt) course.latestAt = lesson.createdAt || 0;
    if (!course.hasExplicitTags) {
      for (const tag of lesson.tags || []) {
        if (!course.tags.includes(tag)) course.tags.push(tag);
      }
    }

    if (!course.chapterMap.has(chapterTitle)) {
      course.chapterMap.set(chapterTitle, []);
    }
    course.chapterMap.get(chapterTitle).push(lesson);
  }

  return Array.from(courseMap.values()).map((course) => {
    const declaredOrder = new Map(
      course.declaredChapters.map((name, idx) => [name.toLowerCase(), idx]),
    );

    const chapters = Array.from(course.chapterMap.entries())
      .map(([title, lessons]) => {
        const sorted = [...lessons].sort(sortByOrder);
        return {
          id: `${course.id}::${title}`,
          title,
          lessons: sorted,
          firstOrder: sorted[0]?.order || 0,
          firstCreatedAt: sorted[0]?.createdAt || 0,
          declaredIdx: declaredOrder.has(title.toLowerCase()) ? declaredOrder.get(title.toLowerCase()) : Number.MAX_SAFE_INTEGER,
        };
      })
      .sort((a, b) => {
        if (a.declaredIdx !== b.declaredIdx) return a.declaredIdx - b.declaredIdx;
        return sortByOrder({ order: a.firstOrder, createdAt: a.firstCreatedAt }, { order: b.firstOrder, createdAt: b.firstCreatedAt });
      });

    const totalLessons = chapters.reduce((sum, ch) => sum + ch.lessons.length, 0);
    return {
      id: course.id,
      dbId: course.dbId,
      _fromDb: course._fromDb,
      title: course.title,
      sourceTitle: course.sourceTitle,
      cover: course.cover,
      hasExplicitCover: course.hasExplicitCover,
      teacher: course.teacher || "Bảo Minh",
      description: course.description,
      tags: course.tags,
      declaredChapters: course.declaredChapters,
      latestAt: course.latestAt,
      createdAt: course.createdAt,
      totalLessons,
      chapters,
      hasStaticLessons: course.hasStaticLessons,
      firebaseVideoIds: course.firebaseVideoIds,
    };
  });
}
