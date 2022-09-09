import React from "react";

const Home: React.FunctionComponent = () => {
	var prenom = localStorage.getItem("prenom");
	return <h1> Welcome :  Happy to see you again  {prenom} </h1>;
};

export default Home;
