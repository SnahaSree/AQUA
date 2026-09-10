import { createBrowserRouter } from "react-router-dom";

import { PublicLayout } from "../components/layout/PublicLayout";
import { HomePage } from "../features/public/home/HomePage";
import { ServicesPage } from "../features/public/services/ServicesPage";
import { CaseStudiesPage } from "../features/public/case-studies/CaseStudiesPage";
import { CaseStudyPage } from "../features/public/case-studies/CaseStudyPage";
import { AboutPage } from "../features/public/about/AboutPage";
import { ContactPage } from "../features/public/contact/ContactPage";
import { IntelligencePage } from "../features/intelligence/IntelligencePage";

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/services",
        element: <ServicesPage />,
      },
      {
        path: "/case-studies",
        element: <CaseStudiesPage />,
      },
      {
        path: "/case-studies/:slug",
        element: <CaseStudyPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
    ],
  },
  {
    path: "/intelligence",
    element: <IntelligencePage />,
  },
]);