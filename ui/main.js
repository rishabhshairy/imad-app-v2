
		    //username/password code
			var submit=document.getElementById('subtn');
			submit.onclick=function() {
			
				//making request to server
 				var request=new XMLHttpRequest();
			  	
			  
			  //capturing response
			  request.onreadystatechange=function(){
			    if(request.readyState===XMLHttpRequest.DONE){
				    
				    if(request.status===200){
				        
				        console.log('User Logged In');
				        alert('login succesfull');
                    }
                    else if(request.status===403){
                        alert('Invalid username/password');
                    }
                    else if(request.status===500)
                    {
                        alert('Server Internal Error');
                    }
			   }
			      
			  };
			        var username=document.getElementById('username').value;
			        var password=document.getElementById('password').value;
			        console.log(username);
			        console.log(password);

			           request.open('POST','http://rishabhshairy.imad.hasura-app.io/login',true);
			           request.setRequestHeader('Content-Type','application/json');
			           request.send(JSON.stringify({username:username,password:password})); 
			  
			};