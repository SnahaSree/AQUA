import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
}

export function SEO({
  title,
  description,
}: SEOProps) {
  useEffect(() => {
    document.title = `${title} | Aqua`;

    let descriptionElement = document.querySelector(
      'meta[name="description"]',
    );

    if (!descriptionElement) {
      descriptionElement = document.createElement("meta");
      descriptionElement.setAttribute("name", "description");
      document.head.appendChild(descriptionElement);
    }

    descriptionElement.setAttribute(
      "content",
      description,
    );
  }, [title, description]);

  return null;
}

