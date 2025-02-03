import { useEffect } from 'react';

export default function ContentDisplay({ item, fdsfsjs, dfjkdsfds, order}) {
  useEffect(() => {
    if (item?.isCanvas) {
      const script = document.createElement('script');
      script.src = 'https://media.truyenso1.xyz/js/wraptext.js';
      script.onload = () => {
        window.fdhsjfkd(item?.content, `canvas-${order}`, fdsfsjs, dfjkdsfds, 'Toidoc.vn');
      };
      document.body.appendChild(script);
    }
  }, [item?.content, order]);

  if (!item?.isCanvas) {
    return <p  className='font-content' dangerouslySetInnerHTML={{__html: item?.content}} />;
  }

  return (
    <div style={{width: '100%', maxWidth: '728px', margin: 'auto'}}>
        <canvas id={`canvas-${order}`} style={{width: '100%', height: 'auto'}}/>
    </div>
  );
}
