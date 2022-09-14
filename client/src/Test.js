import axios from "axios";
import{React, useEffect } from "react";

function Test(){
	useEffect(() =>{
		axios.get("http://localhost:9000/getDbData").then(
			Response => console.log(Response.data)
		)
	},[])
	return(
		<div>
			<h1>
				Testing
			</h1>
		</div>
	)
}
export default Test;