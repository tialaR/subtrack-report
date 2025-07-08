import { useMemo } from 'react';

import { CardDefault } from '@components/CardDefault';
import { CardHeader } from '@components/CardHeader';
import { StatWithBar } from '@components/StatWithBar';

import { theme } from '@styles/theme';
import type { ColorsMapKey } from '@styles/colorsMap';
import * as S from './styles';

type Category = { 
    label: string; 
    amount: number; 
    color: ColorsMapKey; 
};

interface BudgetsSummaryProps {
  currentSpent: number;
  categories: Category[];
}

const BudgetsSummary: React.FC<BudgetsSummaryProps> = ({
  currentSpent,
  categories,
}) => {
  const budgetLimit = useMemo(() => {
    // Soma total dos valores de todas as categorias (100%)
    return categories?.reduce((total, category) => {
      return total + category?.amount;
    }, 0);
  }, [categories]);

  /* gradiente multicolor */
  const categoryGradient = useMemo(() => {
    const FULL_CIRCLE = 360;       // graus em um círculo
    let angleStart = 0;        
    const gradientStops: string[] = [];
  
    categories?.forEach(({ amount = 0, color }) => {
      /* Ignora categorias sem valor */
      if (amount <= 0) return;
  
      /* Busca a cor; fallback para cinza se não existir */
      const colorHex = theme?.colorsMap[color] ?? '#000';
  
      /* Calcula o ângulo proporcional a 100 % (= BUDGET_LIMIT) */
      const sliceDeg = (amount / budgetLimit) * FULL_CIRCLE;
      const angleEnd = angleStart + sliceDeg;
  
      /* Adiciona fatia no formato “<cor> <início>deg <fim>deg” */
      gradientStops?.push(`${colorHex} ${angleStart}deg ${angleEnd}deg`);
  
      /* repara o início da próxima fatia */
      angleStart = angleEnd;
    });
  
    /* Se não houver fatias válidas, retorna transparente */
    if (!gradientStops?.length) return 'transparent';
  
    /* faz o grafico comecar pelo topo da lista */
    return `conic-gradient(from -360deg, ${gradientStops?.join(', ')})`;
}, [budgetLimit, categories]);

  return (
    <CardDefault area="budgets">
        <CardHeader title="Budgets" buttomText="See Details" />

        <S.ContentWrapper>
            <S.Content>
                {/* DONUT CHART */}
                <S.ChartWrapper>
                    <S.OuterRing $background={categoryGradient} />
                    <S.InnerRing $background={categoryGradient} />
                    <S.Hole />
                    <S.CenterText>
                        <span className="amount">${currentSpent}</span>
                        <span className="label">of ${budgetLimit} limit</span>
                    </S.CenterText>
                </S.ChartWrapper>

                <S.CategoryList>
                {categories?.map((cat) => (
                    <li>
                        <StatWithBar
                          key={cat.label}
                          label={cat.label}
                          amount={`$${cat.amount.toFixed(2)}`}
                          color={cat.color}
                        />
                    </li>
                ))}
                </S.CategoryList>
            </S.Content>
        </S.ContentWrapper>
    </CardDefault>
  );
};

export { BudgetsSummary };
