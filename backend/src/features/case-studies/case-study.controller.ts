import type { Request, Response } from "express";

import {
  getPublishedCaseStudyBySlug,
  listPublishedCaseStudies,
} from "./case-study.service.js";

export async function listCaseStudies(
  _req: Request,
  res: Response,
) {
  const studies = await listPublishedCaseStudies();

  res.json({
    success: true,
    data: studies,
  });
}

export async function getCaseStudy(
  req: Request,
  res: Response,
) {
  const slug = req.params.slug;

  if (typeof slug !== "string") {
    res.status(400).json({
      success: false,
      message: "Invalid case study slug.",
    });

    return;
  }

  const study = await getPublishedCaseStudyBySlug(slug);

  if (!study) {
    res.status(404).json({
      success: false,
      message: "Case study not found.",
    });

    return;
  }

  res.json({
    success: true,
    data: study,
  });
}