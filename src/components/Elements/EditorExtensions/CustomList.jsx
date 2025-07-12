import { ListItem } from '@tiptap/extension-list-item';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';

export const CustomBulletList = BulletList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      styleType: {
        default: 'disc',
        parseHTML: element => element.getAttribute('data-style-type') || 'disc',
        renderHTML: attributes => {
          return {
            'data-style-type': attributes.styleType,
            style: attributes.styleType !== 'disc' ? 
                  `list-style-type: ${attributes.styleType}` : 
                  null
          };
        },
      },
    };
  },
});

export const CustomOrderedList = OrderedList.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: 'decimal',
        parseHTML: element => element.getAttribute('data-list-style-type') || 'decimal',
        renderHTML: attributes => {
          // Perbaikan: Jangan render style untuk tipe dengan tanda kurung
          const isParenthesisType = attributes.listStyleType?.includes('parenthesis');
          
          return {
            'data-list-style-type': attributes.listStyleType,
            style: !isParenthesisType ? 
                  `list-style-type: ${attributes.listStyleType}` : 
                  null
          };
        },
      },
    };
  },
});

export const CustomListItem = ListItem.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      listStyleType: {
        default: null,
        parseHTML: element => element.getAttribute('data-list-style-type'),
        renderHTML: attributes => {
          if (!attributes.listStyleType) return {};
          return {
            'data-list-style-type': attributes.listStyleType,
          };
        },
      },
    };
  },
});

// Fungsi untuk menangani gaya list khusus (versi diperbaiki)
export const handleListStyle = (editor, style) => {
  // Periksa apakah list sudah aktif dengan tipe yang sama
  const isActiveBullet = editor.isActive('bulletList', { styleType: style });
  const isActiveOrdered = editor.isActive('orderedList', { listStyleType: style });
  
  // Jika sudah aktif dengan tipe yang sama, matikan list
  if (isActiveBullet) {
    editor.chain().focus().toggleBulletList().run();
    return;
  }
  
  if (isActiveOrdered) {
    editor.chain().focus().toggleOrderedList().run();
    return;
  }
  
  // Matikan list aktif jika ada
  if (editor.isActive('bulletList')) editor.chain().focus().toggleBulletList().run();
  if (editor.isActive('orderedList')) editor.chain().focus().toggleOrderedList().run();
  
  // Terapkan gaya baru
  if (style === 'disc') {
    editor.chain().focus().toggleBulletList({ styleType: 'disc' }).run();
  } 
  else {
    editor.chain().focus().toggleOrderedList({ listStyleType: style }).run();
  }
};