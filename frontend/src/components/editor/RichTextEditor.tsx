import {  Center, Divider, Flex, IconButton, IconButtonProps } from "@chakra-ui/react";
import { useEditor, EditorContent, Editor, Content } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { RiListUnordered, RiH1, RiH2, RiH3, RiBold, RiCodeFill, RiItalic, RiStrikethrough, RiParagraph, RiCodeBoxLine, RiDoubleQuotesL, RiSeparator, RiTextWrap, RiArrowGoBackFill, RiArrowGoForwardFill, RiFormatClear, RiListOrdered} from 'react-icons/ri';

const MenuButton = (props: IconButtonProps) => {
  const activeStyles = {
    background: 'gray.700 !important',
    color: 'white'
  };

  return (<IconButton 
    bg='transparent'
    _hover={{
      background: 'gray.700',
      color: 'white'
    }}
    {...(props.isActive && activeStyles )}
    
    {...props}
  >
    { props.children }
  </IconButton>);
};

const MenuBar = ({ editor } : { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  return (
    <Flex flexDir={'row'} p='2' gap='2' alignItems='center' flexWrap={'wrap'}>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive('bold')} 
        aria-label='Bold'
        icon={<RiBold />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive('italic')}
        aria-label='Italic'
        icon={<RiItalic />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editor.isActive('strike')}
        aria-label='Strike'
        icon={<RiStrikethrough />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editor.isActive('code')}
        aria-label='Code'
        icon={<RiCodeFill />}
      />
      <Center height='20px'>
        <Divider orientation='vertical' borderColor='gray.500' borderLeftWidth={'2px'}/>
      </Center>
      <MenuButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        isActive={editor.isActive('paragraph')}
        aria-label='Paragraph'
        icon={<RiParagraph />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editor.isActive('heading', { level: 1 })}
        aria-label='Heading 1'
        icon={<RiH1 />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editor.isActive('heading', { level: 2 })}
        aria-label='Heading 2'
        icon={<RiH2 />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editor.isActive('heading', { level: 3 })}
        aria-label='Heading 3'
        icon={<RiH3 />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive('bulletList')}
        aria-label='Unordered List'
        icon={<RiListUnordered />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive('orderedList')}
        aria-label='Ordered list'
        icon={<RiListOrdered />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editor.isActive('codeBlock')}
        aria-label='Code block'
        icon={<RiCodeBoxLine />}
      />
      <Center height='20px'>
        <Divider orientation='vertical' borderColor='gray.500' borderLeftWidth={'2px'}/>
      </Center>
      <MenuButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editor.isActive('blockquote')}
        aria-label='Block quote'
        icon={<RiDoubleQuotesL />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        aria-label='Separator'
        icon={<RiSeparator />}
      />
      <Center height='20px'>
        <Divider orientation='vertical' borderColor='gray.500' borderLeftWidth={'2px'}/>
      </Center>
      <MenuButton
        onClick={() => editor.chain().focus().setHardBreak().run()}
        aria-label='Hard break'
        icon={<RiTextWrap />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        aria-label='Clear format'
        icon={<RiFormatClear />}
      />
      <Center height='20px'>
        <Divider orientation='vertical' borderColor='gray.500' borderLeftWidth={'2px'}/>
      </Center>
      <MenuButton
        onClick={() => editor.chain().focus().undo().run()}
        aria-label='Undo'
        icon={<RiArrowGoBackFill />}
      />
      <MenuButton
        onClick={() => editor.chain().focus().redo().run()}
        aria-label='Redo'
        icon={<RiArrowGoForwardFill />}
      />
    </Flex>
  );
}

interface RecipeEditorProps {
  initialContent: Content,
  setContent: (content: Content) => void,
}

const RecipeEditor = ({ initialContent, setContent } : RecipeEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      setContent(editor.getJSON());
    }
  })  

  return (
    <Flex flexDir='column' borderWidth='3px' borderColor='gray.700' borderRadius='5' flex='1' minHeight='100%' width='100%' bg='white'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} id='proseContainer' style={{flex: '1', padding: '1rem', alignItems: 'stretch', display: 'flex', flexBasis: '0', overflowY: 'scroll'}} />
    </Flex>
  );
}

export default RecipeEditor;