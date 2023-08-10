export interface Pet {
    id: string
    name: string
    description: string
    age: number
    type: string
    adopted: boolean
    photoLink: string
}

export interface CreatePet {
    name: string
    description: string
    age: number
    type: string
    photoLink: string
}