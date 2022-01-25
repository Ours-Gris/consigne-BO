import { Component, OnInit } from '@angular/core';
import {Material} from "../data/Material";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialService} from "../material.service";
import Swal from "sweetalert2";
import {Order} from "../../order/data/Order";
import {OrderStatus} from "../../order/data/order.status";
import {AuthService} from "../../shared/services/auth.service";
import {Item} from "../../order/data/Item";
import {OrderService} from "../../order/order.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-material-presentation',
  templateUrl: './material-presentation.component.html',
  styleUrls: ['./material-presentation.component.css']
})
export class MaterialPresentationComponent implements OnInit {
    material!: Material;
    authUrl = environment.api_base_url;

    constructor(
        private materialService: MaterialService,
        private _authService: AuthService,
        private orderService: OrderService,
        private toastr: ToastrService,
        public route: ActivatedRoute,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        const idMaterial = this.route.snapshot.paramMap.get('idMaterial');
        if (idMaterial) {
            this.getMaterial(idMaterial)
        }
    }

    getMaterial(idMaterial: string): void {
        this.materialService.getOneMaterial(idMaterial).subscribe({
            next: (material: Material) => {
                this.material = material;
            },
            error: () => {
                this.router.navigate(['/not-found']).then()
            }
        })
    }

    onOrderMaterial(material: Material): void {
        if (this._authService.currentUser) {
            this._authService.currentUser.subscribe(user => {
                if (user?.sub) {
                    Swal.fire({
                        title: `Me faire livrer ce matériel`,
                        icon: 'question',
                        input: 'number',
                        inputLabel: `Combient voulez vous de ${material.name} ?`,
                        showCancelButton: true
                    }).then(response => {
                        if (response.isConfirmed && response.value && response.value != 0) {
                            const item: Item = {
                                price: material.price,
                                quantity: Number(response.value),
                                material: material.id
                            };
                            const order: Order = {
                                order_status: OrderStatus.PENDING_VALIDATION,
                                items: [item],
                                user: user.sub
                            };

                            this.orderService.addOrder(order).subscribe(
                                () => {
                                    this.toastr.success('Commande ajoutée', 'Commande')
                                },
                                error => {
                                    this.toastr.error(error, 'Erreur');
                                    console.error(error)
                                }
                            )
                        }
                    })
                }
            })
        }
    }
}
