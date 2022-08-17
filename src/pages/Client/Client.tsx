import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import ModalAdd from "./ModalAdd";
import ModalUpdate from "./ModalUpdate";
import user from "../../components/images/user.png";

// const TaskText = styled.div`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     font-size: 50px;
//     height: 70vh;
// `

function Clients() {
	// liste clients
	const [listClients, setListClients] = useState([]);

	const [idclient, setidclient] = React.useState();

	const [show, setShow] = React.useState(false);
	const handleShow = () => setShow(true);

	// insert
	const [client, setClient] = useState({
		user_id: localStorage.getItem("user_id"),
		nom: "",
		prenom: "",
		email: "",
		add: "",
		tel: "",
	});

	// ajout
	const [addClients, setAddClients] = useState();

	async function delClient(client_id: any) {
		fetch(`http://localhost:5003/deleteclient/${client_id}`, {
			method: "DELETE",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setAddClients(client_id);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	function getClients() {
		fetch(`http://localhost:5003/clients/${localStorage.getItem("user_id")}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setListClients(result);
				},
				
				(error) => {
					console.log(error);
				}
			);
	}

	useEffect(() => {
		getClients();
	}, [addClients]);

	return (
		//   <TaskText>Clients</TaskText>
		<div className="container my-5">
			<ModalAdd
				client={client}
				setAddClients={setAddClients}
				setClient={setClient}
			/>

			<div className="row my-5">
				{listClients.map((client: any) => {
					return (
						<div className="col-4 mr-5 mt-2">
							<Card style={{ width: "19rem" }}>
								<Card.Img variant="top" src={user} />
								<Card.Body>
									<Card.Title>Nom : {client.nom}</Card.Title>
									<Card.Title>Prénom : {client.prenom}</Card.Title>
									<Card.Title>Email : {client.mail}</Card.Title>
									<Card.Title>Adresse : {client.add}</Card.Title>
									<Card.Title>Téléphone : {client.tel}</Card.Title>
									<div className="d-flex justify-content-between">
										<div className="p-2 bd-highlight">
											<Button
												variant="danger"
												onClick={() => {
													console.log({ id: client.client_id });
													delClient(client.client_id);
												}}
											>
												supprimer
											</Button>
										</div>

										<div className="p-2 bd-highlight">
											<Button
												variant="info"
												onClick={() => {
													setidclient(client.client_id);
													setClient(client);
													handleShow();
												}}
											>
												modifier
											</Button>
										</div>
									</div>
								</Card.Body>
							</Card>
						</div>
					);
				})}
				<ModalUpdate
					clientUpdate={client}
					setClientUpdate={setClient}
					show={show}
					setShow={setShow}
					idclient={idclient}
				/>
			</div>
		</div>
	);
}

export default Clients;
