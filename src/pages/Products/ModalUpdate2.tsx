import React from "react";
import { Button, FormGroup, Modal } from "react-bootstrap";
import { Input, Label } from "reactstrap";

type Modaltype = {
	productUpdate: any;
	setProductUpdate: Function;
	show: boolean;
	setShow: Function;
	idproduct: any;
};

function ModalUpdate2({
	productUpdate,
	setProductUpdate,
	show,
	setShow,
	idproduct,
}: Modaltype) {
	const handleClose = () => setShow(false);

	async function updateProduct() {
		fetch(`http://localhost:5003/updateproduct/${idproduct}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(productUpdate),
		})
			.then((res) => res.json())
			.then(
				(result) => {
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
				<Modal.Title>Modification du produit</Modal.Title>
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
										defaultValue={productUpdate.nom} //pour pouvoir faire des modif dans le champ input                    onChange={(e: any) => {
										onChange={(e) => {
											productUpdate.nom = e.target.value;
											setProductUpdate(productUpdate);
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
									<Label for="Prix">Prix: </Label>
									<Input
										type="number"
										className="form-control"
										defaultValue={productUpdate.prix}
										onChange={(e) => {
											productUpdate.prix = e.target.value;
											setProductUpdate(productUpdate);
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
									<Label for="image">Image : </Label>
									<Input
										type="text"
										className="form-control"
										defaultValue={productUpdate.image}
										onChange={(e) => {
											productUpdate.image = e.target.value;
											setProductUpdate(productUpdate);
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
						console.log({ productUpdate: productUpdate });
						updateProduct();
						setShow(false);
					}}
				>
					Sauvegarder
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ModalUpdate2;
