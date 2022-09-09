import React from 'react'
import { Button, FormGroup, Modal } from 'react-bootstrap';
import { Input, Label } from 'reactstrap';


type Modaltype = {
	product: any;
	setProduct: Function;
	setAddProducts: Function;
};

function ModalAdd2({product, setProduct,setAddProducts} : Modaltype) {
	// modal
	const [show, setShow] = React.useState<boolean>(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    async function addProduct() {
			fetch("http://localhost:5003/addproduct", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(product),
			})
				.then((res) => res.json())
				.then(
					(result) => {
						setAddProducts(result);
						setShow(false); // fermer le modal
					},

					(error) => {
						console.log(error);
					}
				);
		}

	return (
		<>
			<Button className=" my-4" variant="primary" onClick={handleShow}>
				Ajouter un nouveau produit
			</Button>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Nouveau produit</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="d-flex flex-column bd-highlight mb-3">
						<div className="p-2 bd-highlight">
							<div className="d-flex flex-column bd-highlight mb-3">
								<div className="p-2 bd-highlight">
									<FormGroup>
										<Label for="nom">Nom : </Label>
										<Input
											type="text"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												product.nom = e.target.value;
												setProduct(product);
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
										<Label for="prix">Prix : </Label>
										<Input
											type="number"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												product.prix = e.target.value;
												setProduct(product);
											}}
										/>
									</FormGroup>
								</div>
							</div>
						</div>

						<div className="p-2 bd-highlight">
							<div className="d-flex flex-column bd-highlight mb-3">
								<div className="p-2 bd-highlight">
									<FormGroup >
										<Label for="image">Image : </Label>
										<Input 
											type="text"
											className="form-control"
											placeholder=""
											onChange={(e: any) => {
												product.image = e.target.value;
												setProduct(product);
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
					<Button variant="success" onClick={addProduct}>
						Confirmer
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}

export default ModalAdd2