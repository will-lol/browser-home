import{cssPropertyAlias as r,cssPropertyPrefixFlags as e,cssValuePrefixFlags as s}from"/v106/style-vendorizer@2.2.3/es2022/style-vendorizer.js";var t=[["-webkit-",1],["-moz-",2],["-ms-",4]];function i(){return({stringify:i})=>({stringify(o,a,l){let f="",n=r(o);n&&(f+=i(n,a,l)+";");let y=e(o),u=s(o,a);for(let c of t)y&c[1]&&(f+=i(c[0]+o,a,l)+";"),u&c[1]&&(f+=i(o,c[0]+a,l)+";");return f+i(o,a,l)}})}export{i as default};