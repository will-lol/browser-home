/* esm.sh - esbuild bundle(@twind/preset-autoprefix@1.0.1) deno production */
import{cssPropertyAlias as l,cssPropertyPrefixFlags as m,cssValuePrefixFlags as p}from"/v106/style-vendorizer@2.2.3/deno/style-vendorizer.js";var c=[["-webkit-",1],["-moz-",2],["-ms-",4]];function y(){return({stringify:t})=>({stringify(r,s,e){let a="",f=l(r);f&&(a+=t(f,s,e)+";");let u=m(r),i=p(r,s);for(let o of c)u&o[1]&&(a+=t(o[0]+r,s,e)+";"),i&o[1]&&(a+=t(r,o[0]+s,e)+";");return a+t(r,s,e)}})}export{y as default};
