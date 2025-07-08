import { CardDefault } from '@components/CardDefault';
import { CardHeader } from '@components/CardHeader';

import * as S from './styles';

export interface Transaction {
  id: string;
  title: string;
  amount: number; 
  date: string;   
  avatarUrl?: string;
  icon?: React.ReactNode;                
}

interface TransactionsSummaryProps {
  transactions: Transaction[];
  maxVisible?: number; // padrão 5
}

export const TransactionsSummary: React.FC<TransactionsSummaryProps> = ({ 
    transactions, 
    maxVisible = 5 
}) => {
  const visibleTransactions = transactions?.slice(0, maxVisible);

  return (
    <CardDefault area="transactions" isList>
        <CardHeader title='Transactions' buttomText='View All' />

        <S.List>
            {visibleTransactions?.map((transaction) => (
            <S.Item key={transaction.id}>
                <S.AvatarWithName>
                    {transaction.avatarUrl ? (
                    <S.Avatar src={transaction.avatarUrl} alt={transaction.title} />
                    ) : (
                    <S.IconCircle>{transaction.icon ?? null}</S.IconCircle>
                    )}

                    <S.Name>{transaction?.title}</S.Name>
                </S.AvatarWithName>

                <S.AmountAndDate $positive={transaction.amount > 0}>
                    <span className='amount'>{transaction.amount > 0 ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}</span>
                    <span className="date">{transaction.date}</span>
                </S.AmountAndDate>
            </S.Item>
            ))}
        </S.List>
    </CardDefault>
  );
};
