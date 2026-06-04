import { useQuery } from '@tanstack/react-query';
import api from '../../lib/api';

const ONE_MINUTE = 1000 * 60;

export function usePrismaHealthCheck() {
    return useQuery({
        queryKey: ['prismaHealthCheck'],
        queryFn: async () => {
            const response = await api.get('/health');
            return response.data;
        },
        refetchInterval: ONE_MINUTE,
    });
}