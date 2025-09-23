//Dynamic building of filters for the query
export const buildFilters = (searchTerm: string = '', categoryId: string  = '') => {	
	const filters = [];
	searchTerm && filters.push(`{ name: { contains: "${searchTerm}"}}`);
	categoryId && filters.push(`{ categoryId: { eq: "${categoryId}"}}`);
	return `where: { and: [${filters.join(', ')}] }`;
}	

export const searchInitialFirst: number = 10;