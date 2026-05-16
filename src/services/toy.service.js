import { httpService } from './http.service.js'

export const toyService = {
    query,
    getById,
    remove,
    save,
    getEmptyToy,
    getDefaultFilterBy,
    getDefaultSort,
    getLabels
}

const labels = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]

function query(filterBy, sort) {
    return httpService.get('toy', { params: { filterBy, sort } })
}

function getLabels() {
    return [...labels]
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getEmptyToy() {
    return {
        name: '',
        price: '',
        labels: [],
        inStock: ''
    }
}

function getDefaultFilterBy() {
    return {
        txt: '',
        maxPrice: Number.MAX_SAFE_INTEGER,
        labels: [],
        inStock: null
    }
}

function getDefaultSort() {
    return {
        // 
        by: 'name',
        asc: true
    }
}