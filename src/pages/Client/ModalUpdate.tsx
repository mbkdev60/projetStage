import { Button, FormGroup, Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";

type Modaltype = {
	clientUpdate: any;
	setClientUpdate: Function;
	show: boolean;
	setShow: Function;
	idclient: any;
};

function ModalUpdate({
	clientUpdate,
	setClientUpdate,
	show,
	setShow,
	idclient,
}: Modaltype) {
	const handleClose = () => setShow(false);

	async function updateClient() {
		fetch(`http://localhost:5003/updateclient/${idclient}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(clientUpdate),
		})
			.then((res) => res.json())
			.then(
				(result) => {
					// setClientUpdate(clientUpdate.client_id);
					setShow(false); // pour fermer le modal
				},

				(error) => {
					console.log(error);
				}
			);
	}

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Modification client</Modal.Title>
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
										defaultValue={clientUpdate.nom} //pour pouvoir faire des modif dans le champ input                    onChange={(e: any) => {
										onChange={(e) => {
											clientUpdate.nom = e.target.value;
											setClientUpdate(clientUpdate);
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
										defaultValue={clientUpdate.prenom}
										onChange={(e) => {
											clientUpdate.prenom = e.target.value;
											setClientUpdate(clientUpdate);
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
										defaultValue={clientUpdate.mail}
										onChange={(e) => {
											clientUpdate.mail = e.target.value;
											setClientUpdate(clientUpdate);
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
										defaultValue={clientUpdate.add}
										onChange={(e) => {
											clientUpdate.add = e.target.value;
											setClientUpdate(clientUpdate);
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
									<Label for="tel">Tel : </Label>
									<Input
										type="tel"
										className="form-control"
										defaultValue={clientUpdate.tel}
										onChange={(e) => {
											clientUpdate.tel = e.target.value;
											setClientUpdate(clientUpdate);
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
				<Button
					variant="success"
					onClick={() => {
						updateClient();
						setShow(false);
					}}
				>
					Sauvegarder
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalUpdate;
