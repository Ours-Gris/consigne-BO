import {Injectable} from '@angular/core';
import {environment} from "../../environments/environment";
import {AuthService} from "../shared/services/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Material} from "./data/Material";

@Injectable({
    providedIn: 'root'
})
export class MaterialService {

    private authUrl = environment.api_base_url;

    constructor(
        private authService: AuthService,
        private http: HttpClient
    ) {
    }

    countAllMaterials(filter?: string): Observable<number> {
        let params = new HttpParams();
        if (filter) {
            params = params.set('Nom_contains', filter);
        }
        const options = {
            params
        };
        return this.http.get(this.authUrl + '/materials/count', options).pipe(
            map((res: any) => res)
        );
    }

    getMaterials(filter?: string, sortBy?: string, sortDirection?: string, pageNumber?: number, pageSize?: number): Observable<Material[]> {
        let params = new HttpParams()
            .set('_sort', sortBy ? sortBy : 'name')
            .set('_direction', sortDirection ? sortDirection : 'ASC')
            .set('_start', pageNumber && pageSize ? (pageNumber * pageSize).toString() : '0')
            .set('_limit', pageSize ? pageSize.toString() : '10');
        if (filter) {
            params = params.set('name_contains', filter);
        }
        const options = {
            params
        };

        return this.http.get(this.authUrl + '/materials', options).pipe(
            map((res: any) => res)
        );
    }

    getMaterialsExport(): Observable<Material[]> {
        return this.http.get(this.authUrl + '/materials/export').pipe(
            map((res: any) => res)
        );
    }

    getOneMaterial(idMaterial: string): Observable<Material> {
        return this.http.get(this.authUrl + '/materials/' + idMaterial).pipe(
            map((res: any) => res)
        );
    }

    makeFormData(material: Material): FormData {
        const formData = new FormData();
        formData.append('name', material.name);
        formData.append('code', material.code);
        formData.append('description', material.description);
        formData.append('internal_stock', String(material.internal_stock));
        formData.append('img_material', material.img_material);
        formData.append('price', String(material.price));
        // For delete old img
        if (material.img_name) {
            formData.append('img_name', material.img_name);
        }
        return formData
    }

    addMaterial(material: Material): Observable<Material> {
        return this.http.post(this.authUrl + '/materials', this.makeFormData(material)).pipe(
            map((newMaterial: any) => newMaterial)
        );
    }

    editMaterial(idMaterial: string, material: Material): Observable<Material> {
        return this.http.put(this.authUrl + '/materials/' + idMaterial, this.makeFormData(material)).pipe(
            map((newMaterial: any) => newMaterial)
        );
    }

    deleteMaterial(idMaterial: string): Observable<void> {
        return this.http.delete(`${this.authUrl}/materials/${idMaterial}`).pipe(
            map(() => {
                console.log('Type de materiel supprimé');
            })
        )
    }
}
