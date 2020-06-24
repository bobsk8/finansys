import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDatabase implements InMemoryDbService {

    createDb(): any {
        const categories = [
            { id: 1, name: 'Moradia', description: 'Pagamentos de Contas de Casa' },
            { id: 2, name: 'Saúde', description: 'Plano de saúde e remédios' },
            { id: 3, name: 'Lazer', description: 'Cinema, parques, praia, etc' },
            { id: 4, name: 'Salário', description: 'Recebimento de Salário' },
            { id: 1, name: 'Freelas', description: 'Trabalhos como freelas' }
        ];
        return { categories };
    }

}