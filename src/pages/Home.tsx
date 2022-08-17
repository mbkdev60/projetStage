import React from "react";

const Home: React.FunctionComponent = () => {
	var email = localStorage.getItem("user");
	return <h1> Welcome :  Happy to see you again  {email} </h1>;
};

export default Home;
