(this["webpackJsonpsorting-visualization"]=this["webpackJsonpsorting-visualization"]||[]).push([[81],{378:function(n,e,t){"use strict";function a(n){!function(n){function e(n,e){return"___"+n.toUpperCase()+e+"___"}Object.defineProperties(n.languages["markup-templating"]={},{buildPlaceholders:{value:function(t,a,o,i){if(t.language===a){var r=t.tokenStack=[];t.code=t.code.replace(o,(function(n){if("function"===typeof i&&!i(n))return n;for(var o,s=r.length;-1!==t.code.indexOf(o=e(a,s));)++s;return r[s]=n,o})),t.grammar=n.languages.markup}}},tokenizePlaceholders:{value:function(t,a){if(t.language===a&&t.tokenStack){t.grammar=n.languages[a];var o=0,i=Object.keys(t.tokenStack);!function r(s){for(var u=0;u<s.length&&!(o>=i.length);u++){var c=s[u];if("string"===typeof c||c.content&&"string"===typeof c.content){var p=i[o],g=t.tokenStack[p],l="string"===typeof c?c:c.content,f=e(a,p),k=l.indexOf(f);if(k>-1){++o;var h=l.substring(0,k),m=new n.Token(a,n.tokenize(g,t.grammar),"language-"+a,g),v=l.substring(k+f.length),d=[];h&&d.push.apply(d,r([h])),d.push(m),v&&d.push.apply(d,r([v])),"string"===typeof c?s.splice.apply(s,[u,1].concat(d)):c.content=d}}else c.content&&r(c.content)}return s}(t.tokens)}}}})}(n)}n.exports=a,a.displayName="markupTemplating",a.aliases=[]}}]);
//# sourceMappingURL=react-syntax-highlighter_languages_refractor_markupTemplating.e82c18b7.chunk.js.map