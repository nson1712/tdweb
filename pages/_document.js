import Document, { Html, Head, Main, NextScript } from 'next/document'

class WebDocument extends Document {
  render() {
    return (
      <Html lang="en-US">
        <Head>
        <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-M4WNB5H');`
            }}
          />


          <script dangerouslySetInnerHTML={{
              __html: `
          window.fbAsyncInit = function() {
            FB.init({
              appId      : '939240831358946',
              cookie     : true,
              xfbml      : true,
              version    : 'v21.0'
            });
              
            FB.AppEvents.logPageView();   
              
          };

          (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'facebook-jssdk'));
          `}}/>

          <script async src="https://www.googletagmanager.com/gtag/js?id=UA-130623220-1"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());
                      gtag('config', 'UA-130623220-1');`
            }}
          />
          {/*<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3889009823396535"
              crossOrigin="anonymous"></script>*/}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(h,e,a,t,m,p) {
                m=e.createElement(a);m.async=!0;m.src=t;
                p=e.getElementsByTagName(a)[0];p.parentNode.insertBefore(m,p);
                })(window,document,'script','https://u.heatmap.it/log.js');`
            }}/>
            <meta property="fb:admins" content="&#123;2826050207675636&#125;"/>
            <meta property="fb:admins" content="&#123;8215672165140867&#125;"/>
            <meta property="fb:admins" content="&#123;2647254008756350&#125;"/>
            <meta name='dmca-site-verification' content='QnByd2FuMnJtMWRFQ1VzTS8xaHdBZz090' />
        </Head>
        <body>
          <div dangerouslySetInnerHTML={{__html: `
            <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M4WNB5H"
            height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
          `}}/>
          {/*<div id="fb-root"></div>
          <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v17.0&appId=497598104059581&autoLogAppEvents=1" nonce="4vCkeAKr"></script>
          <div id="fb-root"></div>*/}

          {/* SDK facebook comment */}
          {/*<script async defer crossOrigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0" nonce="WslyTdua"></script>*/}
          <script src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"> </script>
          <Main/>
          <NextScript />
          <script dangerouslySetInnerHTML={{
            __html: `(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter94974655 = new Ya.Metrika({ id:94974655, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true, ecommerce:"dataLayer" }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], x = "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/watch.js", s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; for (var i = 0; i < document.scripts.length; i++) { if (document.scripts[i].src === x) { return; } } s.type = "text/javascript"; s.async = true; s.src = x; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");`
          }} />
          <div dangerouslySetInnerHTML={{__html: `
            <noscript><div><img src="https://mc.yandex.ru/watch/94974655" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
          `}}/>
        </body>
      </Html>
    )
  }
}
export default WebDocument