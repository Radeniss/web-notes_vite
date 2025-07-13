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
            style: `list-style-type: ${attributes.styleType}`
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
          // Gunakan class CSS untuk jenis khusus
          if (attributes.listStyleType?.includes('parenthesis')) {
            return {
              'data-list-style-type': attributes.listStyleType,
              'class': `list-type-${attributes.listStyleType}`
            };
          }
          
          return {
            'data-list-style-type': attributes.listStyleType,
            'style': `list-style-type: ${attributes.listStyleType}`
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
      styleType: {
        default: null,
        parseHTML: element => element.getAttribute('data-style-type'),
        renderHTML: attributes => {
          if (!attributes.styleType) return {};
          return {
            'data-style-type': attributes.styleType,
          };
        },
      },
    };
  },
});

// Fungsi untuk menangani gaya list khusus (Versi diperbaiki)
export const handleListStyle = (editor, style) => {
  const isBulletType = ['disc', 'circle', 'square'].includes(style);
  const listType = isBulletType ? 'bulletList' : 'orderedList';
  
  // Cek apakah list dengan style yang sama sudah aktif
  const isActive = editor.isActive(listType, { 
    [isBulletType ? 'styleType' : 'listStyleType']: style 
  });
  
  if (isActive) {
    // Matikan jika sudah aktif
    editor.chain().focus().toggleList(listType).run();
    return;
  }
  
  // Matikan semua list aktif terlebih dahulu
  if (editor.isActive('bulletList')) {
    editor.chain().focus().toggleBulletList().run();
  }
  if (editor.isActive('orderedList')) {
    editor.chain().focus().toggleOrderedList().run();
  }
  
  // Aktifkan list dengan style yang dipilih
  if (isBulletType) {
    editor.chain().focus().toggleBulletList({ styleType: style }).run();
  } else {
    editor.chain().focus().toggleOrderedList({ listStyleType: style }).run();
  }
};