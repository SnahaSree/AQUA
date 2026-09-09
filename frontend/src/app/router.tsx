import { createBrowserRouter } from "react-router-dom";

import { IntelligencePage } from "../features/intelligence/IntelligencePage";

export const router = createBrowserRouter([
  {
    path: "/intelligence",
    element: <IntelligencePage />,
  },
]);