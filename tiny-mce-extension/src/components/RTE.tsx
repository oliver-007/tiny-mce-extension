import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

const RTE = () => {
  const editorRef = useRef<any>(null);

  const handleEditorInit = (editor: any) => {
    // Listen for paste events
    editor.on("pastepreprocess", (e: any) => {
      //   console.log("pasting dectected : ", e.content);
      const contentSource = detectContentSource(e.content);
      //   console.log("Detected Source : ", contentSource);

      if (contentSource) {
        const keepFormatting = confirm(
          `Pasted content detected from ${contentSource}. Keep formatting?`
        );

        if (!keepFormatting) {
          e.content = stripFormatting(e.content);
        }
      }
    });
  };

  // Function to detect the source of the content (MS Word, Google Docs, Excel)
  const detectContentSource = (content: string) => {
    if (content.includes("mso-") || content.includes("class=Mso")) {
      return "Microsoft Office"; // MS Word
    }
    if (
      content.includes("docs-internal-guid") ||
      content.includes("data-google") ||
      content.includes('class="kix')
    ) {
      return "Google Docs"; // Google Docs
    }
    if (content.includes("<table") && content.includes('style="width')) {
      return "Microsoft Excel"; // Excel
    }
    return null;
  };

  // Function to strip unnecessary formatting
  const stripFormatting = (content: string) => {
    return content
      .replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags
      .replace(/style="[^"]*"/g, ""); // Remove inline styles
  };

  return (
    <Editor
      onInit={(e, editor) => {
        editorRef.current = editor;
        handleEditorInit(editor);
      }}
      tinymceScriptSrc="/tinymce/tinymce.min.js"
      init={{
        skin_url: "/tinymce/skins/ui/oxide-dark",
        icons_url: "/tinymce/icons/default/icons.min.js",
        height: 500,
        plugins: [
          "anchor",
          "autolink",
          "charmap",
          "codesample",
          "emoticons",
          "image",
          "link",
          "lists",
          "media",
          "searchreplace",
          "table",
          "visualblocks",
          "wordcount",
        ],
        toolbar:
          "undo redo | bold italic | alignleft aligncenter alignright | code",
        content_css: "/tinymce/skins/content/default/content.css",
      }}
    />
  );
};

export default RTE;
