import {CaseStudy} from "../../models/CaseStudy.js";

export async function listPublishedCaseStudies() {
  return CaseStudy.find({
    published: true,
  })
    .sort({ createdAt: -1 })
    .lean();
}

export async function getPublishedCaseStudyBySlug(
  slug: string,
) {
  return CaseStudy.findOne({
    slug,
    published: true,
  }).lean();
}