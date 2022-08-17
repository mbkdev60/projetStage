import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import produits from "../../components/images/produits.jpg";
import ModalUpdateOrder from "./ModalUpdateOrder";

function Order() {
	const [product, setProduct] = React.useState();
	// liste clients
	const [listProducts, setListProducts] = useState([]);
	const [update, setIsUpdate] = React.useState<boolean>(false);
	const [show, setShow] = React.useState(false);
	const handleShow = () => setShow(true);

	const [tabCommand, setTabCommand] = useState<any>([]);

	function getProducts() {
		fetch(`http://localhost:5003/products/${localStorage.getItem("user_id")}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then(
				(result) => {
					setListProducts(result);
				},

				(error) => {
					console.log(error);
				}
			);
	}

	const [tot, setTot] = React.useState(0);

	function totalOrder() {
		let Somme = 0;
		tabCommand.forEach((element: any) => {
			Somme += Number(element.Total);
		});

		setTot(Somme);
	}

	useEffect(() => {
		getProducts();
		setIsUpdate(false);
	}, [update]);

	return (
		<div className="container my-5">
			<div className="row my-5">
				<div className="col-8 mr-3 mt-2">
					{" "}
					{/* 2/3 de l'écran col-8*/}
					<div className="row">
						{listProducts.map((product: any) => {
							return (
								<div className="col-sm mt-3">
									<Card style={{ width: "19rem" }}>
										<Card.Img variant="top" src={produits} />
										<Card.Body>
											<Card.Title>Nom : {product.nom}</Card.Title>
											<Card.Title>Prix : {product.prix}</Card.Title>
											<Card.Title>Image : {product.image}</Card.Title>
											<div className="d-flex justify-content-center">
												<div className="p-2 bd-highlight">
													<Button
														variant="success"
														onClick={() => {
															setProduct(product);
															handleShow();
														}}
													>
														Ajouter
													</Button>
												</div>
											</div>
										</Card.Body>
									</Card>
								</div>
							);
						})}
						<ModalUpdateOrder
							show={show}
							setShow={setShow}
							product={product}
							tabCommand={tabCommand}
							setTabCommand={setTabCommand}
							setTot={setTot}
						/>
					</div>
				</div>
				<div className="col-4">
					{" "}
					{/* le 1/3 qui restait col-4 */}
					<h1 style={{ textAlign: "center" }}> Votre Panier </h1>
					<table className="table mt-5 text-center">
						<thead>
							<tr>
								<th>Nom</th>
								<th>Prix</th>
								<th>Image</th>
								<th>Quantité</th>
								<th>Total</th>
							</tr>
						</thead>
						<tbody>
							{tabCommand.map((data: any, index: number) => {
								return (
									<tr>
										<td>{data.Nom}</td>
										<td>{data.Prix}€</td>
										<td>{data.Image}</td>
										<td>{data.Quantité}</td>
										<td>{data.Total}€</td>
										<td>
											<Button
												variant="danger"
												onClick={() => {
													tabCommand.splice(index, 1);
													totalOrder();
													setIsUpdate(true);
												}}
											>
												supprimer
											</Button>
										</td>
									</tr>
								);
							})}
						</tbody>
						<tfoot>
							
								<th> Total du panier</th>
								<td> {tot} €</td>
								
						</tfoot>
					</table>
				</div>
			</div> 
		</div>
	);
}

export default Order;
