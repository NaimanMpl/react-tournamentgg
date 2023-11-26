export interface Report {
    id: string,
    reason: string,
    date: Date,
    description: string,
    userId: string,
    userLogin: string,
    userEmail: string,
    userProfilePicture?: string,
    matchId: string,
    status: 'En cours' | 'Traité' | 'Refusé'
}