import React from "react";
import { Button, Modal } from "react-bootstrap";
import { FormGroup, Label, Input } from "reactstrap";

type Modaltype = {
	client: any;
	setClient: Function;
	setAddClients: Function;
};

function ModalAdd({ client, setClient, setAddClients }: Modaltype) {
	// modal
	const [show, setShow] = React.useState<boolean>(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	async function addClient() {
		fetch("http://localhost:5003/addclient", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(client),
		})
		.then((res) => res.json())
		.then(
			(result) => {
			setAddClients(result);
			setShow(false);// fermer le modal
			},

			(error) => {
			console.log(error);
			}
		);
	}

	return (
		<>
			<Button className=" my-4" variant="primary" onClick={handleShow}>
				Ajouter un nouveau client
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
				<Modal.Title>Nouveau client</Modal.Title>
				</Modal.Header>
				<Modal.Body>
				<div className="d-flex flex-column bd-highlight mb-3">
					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Label for="Nom">Nom : </Label>
									<Input
									type="text"
									className="form-control"
									placeholder=""
									onChange={(e: any) => {
										client.nom = e.target.value;
										setClient(client);
									}}
									/>
								</FormGroup>
							</div>
						</div>
					</div>

					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Label for="Prenom">Prénom : </Label>
									<Input
									type="text"
									className="form-control"
									placeholder=""
									onChange={(e: any) => {
										client.prenom = e.target.value;
										setClient(client);
									}}
									/>
								</FormGroup>
							</div>
						</div>
					</div>

					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Label for="Email">Email : </Label>
									<Input
									type="email"
									className="form-control"
									placeholder=""
									onChange={(e: any) => {
										client.mail = e.target.value;
										setClient(client);
									}}
									/>
								</FormGroup>
							</div>
						</div>
					</div>

					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Label for="add">Adresse : </Label>
									<Input
									type="text"
									className="form-control"
									placeholder=""
									onChange={(e: any) => {
										client.add = e.target.value;
										setClient(client);
									}}
									/>
								</FormGroup>
							</div>
						</div>
					</div>

					<div className="p-2 bd-highlight">
						<div className="d-flex flex-column bd-highlight mb-3">
							<div className="p-2 bd-highlight">
								<FormGroup>
									<Label for="Tel">Tel : </Label>
									<Input
									type="tel"
									className="form-control"
									placeholder=""
									onChange={(e: any) => {
										client.tel = e.target.value;
										setClient(client);
									}}
									/>
								</FormGroup>
							</div>
						</div>
					</div>
				</div>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="warning" onClick={handleClose}>
						Fermer
					</Button>
					<Button variant="success" onClick={addClient}>
						Confirmer
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalAdd;
