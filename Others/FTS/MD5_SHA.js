// MD2 
// MD5 
// SHA-1 
// SHA-256 
// SHA-384 
// SHA-512

var algorithm = 'SHA-512';

if(Java.available)
{
    Java.perform(function(){
		var MessageDigest= Java.use('java.security.MessageDigest');
		var digest1 = MessageDigest.digest.overload("[B","int","int");
		digest1.implementation=function(buf,offset,len){
			var ret = digest2.call(this,buf);
			parseIn(this,buf);
			parseOut(this,ret);
			return ret;
        }
		
		var digest2 = MessageDigest.digest.overload("[B");
		digest2.implementation=function(buf){
			var ret = digest2.call(this,buf);
			parseIn(this,buf);
			parseOut(this,ret);
			return ret;
		}
	});
	
}

function parseIn(digest,input){
	var Integer= Java.use('java.lang.Integer');
	var String= Java.use('java.lang.String');
	if(digest.getAlgorithm() != algorithm){
		return;
	}
	try{
		console.log("original:"+String.$new(input));
	}
	catch(e){
		console.log(parseHex(input));
	}
}

function parseOut(digest,ret){
	var Integer= Java.use('java.lang.Integer');
	var String= Java.use('java.lang.String');
	var result = "";
	for(var i = 0;i<ret.length;i++){
		var val = ret[i];
		if(val < 0){
			val += 256;
		}
		var str = Integer.toHexString(val);
		if(String.$new(str).length()==1){
			str = "0" + str;
		}
		result += str;
	}
	
	if(digest.getAlgorithm()==algorithm){
		console.log(digest.getAlgorithm() + "(32):" + result);
		console.log(digest.getAlgorithm() + "(16):" + result.substring(8,24));
		console.log("");
	}
}

function parseHex(input){
	var Integer= Java.use('java.lang.Integer');
	var byte_array = "";
	for(var j = 0;j<input.length;j++){
		var hex = Integer.toHexString(input[j]);
		if(hex.length == 1){
			hex = "0" + hex;
		}
		byte_array += hex;
	}
	
	console.log("original(hex):");
	var pair = "";
	var hex_table = "";
	for(var k = 0;k<byte_array.length;k++){
		pair += byte_array.charAt(k);
		if((k+1)%2 == 0){
			pair += " "
			hex_table += pair;
			pair = ""
		}
		
		if((k+1)%32 == 0){
			hex_table += "\n"
		}
	}
	return hex_table;
}