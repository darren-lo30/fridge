import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";


interface RichTextRendererProps {
  content: JSON,
}

const RichTextRenderer = ({ content } : RichTextRendererProps ) => {
  const editor = useEditor({
    editable: false,
    extensions: [
      StarterKit,
    ],
    content: content,
  })

  return (
    <EditorContent editor={editor} id='proseContainer' />
  );
}

export default RichTextRenderer;