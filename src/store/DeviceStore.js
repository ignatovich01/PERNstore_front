import {makeAutoObservable} from 'mobx'

export class DeviceStore {
    constructor(){
        this._types = [];
        this._brands = [];
        this._device = [];
            this._selectedType = {}
            this._selectedBrand = {}
            this._page = 1;
            this._totalCount = 0;
            this._limit = 3;

            makeAutoObservable(this);
    }

    setTypes(types){
        this._types = types
    }
    setBrands(brands){
        this._brands = brands
    }
    setDevices(device){
        this._device = device
        }
    setSelectedType (type){
        this._selectedType = type
        this.setPage(1)
        }
    setSelectedBrand (brand){
            this._selectedBrand = brand
            this.setPage(1)
            }
    setPage (page){
            this._page = page
            }
    setTotalCount (count){
            this._totalCount = count
            }  
               
        
    get types(){
        return this._types
    }
    get brands(){
        return this._brands
    }
    get devices(){
        return this._device
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
    get page(){
        return this._page
    }
    get totalCount(){
        return this._totalCount
    }
    get limit(){
        return this._limit
    }
}