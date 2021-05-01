## VAA 전략 계산기
https://quant-jj-vaa.herokuapp.com/

## 자산군 분류
- 공격 자산군<br>
SPY(미국), EFA(선진국), EEM(개도국), AGG(잡채권)

- 수비 자산군<br>
SHY(단기채), IEF(중기채), LQD(회사채)<br>
**(SHY는 현금으로 가정)**

## 모멘텀 계산법
- 최근 1개월: 가중치 12
- 최근 3개월: 가중치 4
- 최근 6개월: 가중치 2
- 최근 12개월: 가중치 1

## 방법
1. 먼저 공격 자산군 종목들이 모두 플러스 수익률이라면 공격 자산 중 제일 모멘텀이 좋은 종목 매수한다.
2. 공격 자산이라도 하나라도 마이너스 모멘텀이면 수비 자산군 모멘텀이 좋은 종목을 매수한다.
3. 모두 마이너스 모멘텀이라면 현금을 보유한다(현재는 생략, SHY를 현금 취급).
4. 월 리밸런싱

## Reference
- [Vigilant Asset Allocation from Dr. Wouter Keller and JW Keuning](https://allocatesmartly.com/vigilant-asset-allocation-dr-wouter-keller-jw-keuning/)
- [할투 유튜브](https://youtu.be/eQeu8v_-Y98)
