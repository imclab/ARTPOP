importScripts("base64.js","omggif.js","NeuQuant.js");var thereAreTransparentPixels=!1,rgba2rgb=function(a,b,c){for(var d=[],e=0,f=a.length,g=0;f>g;g+=4){var h=a[g],i=a[g+1],j=a[g+2],k=a[g+3];c&&0===k?(h=c[0],i=c[1],j=c[2],thereAreTransparentPixels=!0):b&&255>k&&(h=(h*k+b[0]*(255-k))/255|0,i=(i*k+b[1]*(255-k))/255|0,j=(j*k+b[2]*(255-k))/255|0),d[e++]=h,d[e++]=i,d[e++]=j}return d},rgb2num=function(a){for(var b=[],c=0,d=a.length,e=0;d>e;e+=3)b[c++]=a[e+2]|a[e+1]<<8|a[e]<<16;return b};self.onmessage=function(a){var b,c=a.data.frames,d=c.length,e=a.data.delay/10,f=a.data.matte?a.data.matte:[255,255,255],g=a.data.transparent?a.data.transparent:!1,h=Date.now(),i=new Uint8Array(new ArrayBuffer(c[0].width*c[0].height*d*5)),j=new GifWriter(i,c[0].width,c[0].height,{loop:0}),k=function(a){for(var b=a.data,c=rgba2rgb(b,f,g),d=c.length,h=d/3,i=[],k=new NeuQuant(c,d,10),l=k.process(),m=rgb2num(l),n=0,o=0;h>o;o++){var p=k.map(255&c[n++],255&c[n++],255&c[n++]);i[o]=p}var q={palette:new Uint32Array(m),delay:e};thereAreTransparentPixels&&(q.transparent=k.map(g[0],g[1],g[2]),q.disposal=2),j.addFrame(0,0,a.width,a.height,new Uint8Array(i),q)};for(b=0;d>b;b++)k(c[b]),self.postMessage({type:"progress",data:(b+1)/d});var l="",m=j.end();for(b=0;m>b;b++)l+=String.fromCharCode(i[b]);var n=function(a,b){var c,d=a.end(),e=new Uint8Array(new ArrayBuffer(d));for(c=0;d>c;c++)e[c]=b[c];return e},o=n(j,i);self.postMessage({type:"gif",buffer:o,data:l,dataURL:"data:image/gif;base64,"+base64.encode(l),frameCount:d,encodeTime:Date.now()-h}),self.close()};