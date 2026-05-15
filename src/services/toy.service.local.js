import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'

_createToys()

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

function query(filterBy = {}, sort = { by: 'name', asc: true }) {
    return storageService.query(STORAGE_KEY)
        .then(toys => {
            // 1. Filter by Name (txt)
            if (filterBy.txt) {
                const regex = new RegExp(filterBy.txt, 'i')
                toys = toys.filter(toy => regex.test(toy.name))
            }

            // 2. Filter by Min Price
            if (filterBy.minPrice) {
                toys = toys.filter(toy => toy.price >= filterBy.minPrice)
            }

            // 3. Filter by Max Price
            if (filterBy.maxPrice) {
                toys = toys.filter(toy => toy.price <= filterBy.maxPrice)
            }

            // 4. Filter by Labels (Multiple Select)
            if (filterBy.labels && filterBy.labels.length) {
                toys = toys.filter(toy => 
                    filterBy.labels.every(label => toy.labels.includes(label))
                )
            }

            // 5. Filter by Inventory (inStock)
            if (filterBy.inStock !== undefined && filterBy.inStock !== null && filterBy.inStock !== '') {
                // Ensure we are comparing actual booleans
                const isStock = (filterBy.inStock === 'true' || filterBy.inStock === true)
                toys = toys.filter(toy => toy.inStock === isStock)
            }

            // 6. Sorting
            if (sort.by === 'name') {
                toys.sort((a, b) => a.name.localeCompare(b.name) * (sort.asc ? 1 : -1))
            } else if (sort.by === 'price') {
                toys.sort((a, b) => (a.price - b.price) * (sort.asc ? 1 : -1))
            } else if (sort.by === 'created') {
                toys.sort((a, b) => (a.createdAt - b.createdAt) * (sort.asc ? 1 : -1))
            }

            return toys
        })
}

function getLabels() {
    return [...labels]
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        return storageService.post(STORAGE_KEY, toy)
    }
}

function getEmptyToy() {
    return {
        name: utilService.makeWord(),
        price: '',
        labels: [],
        inStock: true
    }
}

function getDefaultFilterBy() {
    return {
        txt: '',
        maxPrice: Infinity,
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

function _createToys() {
    var toys = utilService.loadFromStorage(STORAGE_KEY)
    if (toys && toys.length > 0) return

    toys = []
    for(var i = 0; i < 12; i++){
        const toy = getEmptyToy()
        toy._id = utilService.makeId()
        toys.push(toy)
    }
    utilService.saveToStorage(STORAGE_KEY, toys)
}