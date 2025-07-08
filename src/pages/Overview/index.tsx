import { CardSummary } from "@components/CardSummary";
import { PotsSummary } from "@components/PotsSummary";
import { BudgetsSummary } from "@components/BudgetsSummary";
import { TransactionsSummary } from "@components/TransactionsSummary";
import { RecurringBillsSummary } from "@components/RecurringBillsSummary";

import * as S from './styles';

const Overview: React.FC = () => {
    return(
        <>
            <S.SummaryGrid>
                <CardSummary
                    title="Current Balance"
                    amount="$4,836.00"
                    variant="primary"
                />
                <CardSummary
                    title="Income"
                    amount="$3,814.25"
                />
                <CardSummary
                    title="Expenses"
                    amount="$1,700.50"
                />
            </S.SummaryGrid>
        
            <S.OverviewGrid>
                <PotsSummary 
                    total="$850" 
                    items={[
                    { label: 'Savings', amount: '$159', color: 'green'  },
                    { label: 'Gift', amount: '$40',  color: 'cyan'   },
                    { label: 'Concert Ticket', amount: '$110', color: 'purple' },
                    { label: 'New Laptop', amount: '$10',  color: 'orange' },
                ]} />

                <BudgetsSummary
                    currentSpent={338}
                    categories={[
                        { label: 'Entertainment', amount: 50,  color: 'green'  },
                        { label: 'Bills',         amount: 750, color: 'cyan'   },
                        { label: 'Dining Out',    amount: 75,  color: 'yellow' },
                        { label: 'Personal Care', amount: 100, color: 'navy'   },
                    ]}
                />

                    <TransactionsSummary
                        transactions={[
                            {
                              id: '1',
                              title: 'Emma Richardson',
                              amount: 75.50,
                              date: '2024-08-19',
                              avatarUrl: 'https://randomuser.me/api/portraits/women/1.jpg',
                            },
                            {
                              id: '2',
                              title: 'Savory Bites Bistro',
                              amount: -55.50,
                              date: '2024-08-19',
                              icon: '🥖',
                            },
                            {
                              id: '3',
                              title: 'Daniel Carter',
                              amount: -42.30,
                              date: '2024-08-18',
                              avatarUrl: 'https://randomuser.me/api/portraits/men/2.jpg',
                            },
                            {
                              id: '4',
                              title: 'Sun Park',
                              amount: 120.00,
                              date: '2024-08-17',
                              avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
                            },
                            {
                              id: '5',
                              title: 'Urban Services Hub',
                              amount: -65.00,
                              date: '2024-08-17',
                              icon: '🍩',
                            },
                            {
                              id: '6',
                              title: 'Extra Transaction',
                              amount: -100.00,
                              date: '2024-08-16',
                              icon: '💸',
                            },
                          ]}
                    />

                    <RecurringBillsSummary
                      bills={[
                        { label: 'Paid Bills',      amount: 190.0,  color: 'green'  },
                        { label: 'Total Upcoming',  amount: 194.98, color: 'yellow' },
                        { label: 'Due Soon',        amount: 59.98,  color: 'cyan'   },
                        { label: 'Due Later 2',        amount: 60.0,  color: 'purple'   },
                      ]}
                    />
            </S.OverviewGrid>
        </>
  );
}

export { Overview }