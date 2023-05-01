---
layout: post
title: "Data science_midexam"
description: >
hide_last_modified: true
---

# Data science_midexam

---

아니 썼던게 날라갔네..

이번에 중간고사 기간동안 열심히 해왔던 dwitter 프로젝트는 잠시 멈추고 시험공부를 좀 했는데, 그 중 하나인 데이터사이언스 과목에 중간고사 시험문제 정리해둔게 아깝기도 하고,, 언젠가는 진짜 언젠가는 다시 한번쯤 열어볼 수 있지 않을까 해서 그대로 복사붙여넣기 해본다.

이 게시글을 찾아서 본다고 한들, 아마 이해 못할 거다.. 나만 이해하도록 중간고사를 압축시켜놨으니.

시간이 지난 나여도 이해할 수 있겠지 결국 난데 뭐

## Mid exam

### O/X quiz

python은 인터프리터 언어인가?, 한라인 쓸때마다 실행되는가? → o

Variable in python are contains for storing data value and they can variable with a numbr of the underscore character - 0

set are used to store multiple item a single variable, element는 변경이 가능한가? - o

Tuples store multiple items in a single variable set 의 elements는 have an order and can be changed - X

Multiple inheritance in python indicates a class can be derived from more than one superclass – o

### numpy quiz

1. ([1, 2, 3]) + ([1, 2, 3], [4, 5, 6], [7, 8, 9]) 이렇게 더하면 결과가 뭔가 → [2 4 6], [5, 7, 9], [8, 10, 12]

2. ([1, 2, 3, 4]) + ([1, 2, 3], [4, 5, 6], [7, 8, 9]) 이렇게 더하면 결과가 뭔가 → 애초에 shape 다르다고 더해지지 않음

3. 왜 저 위에 결과가 다른가 → 2번 앞 배열의 dimenstion 과 뒷 배열의 dimesion이 브로드캐스팅이 불가능함… (4,) , (3, 3) 이랑 앞이 맞지 않아서 안 됨

브로드캐스팅 규칙 -> 차원 수가 적은 배열 앞에 1을 추가하여 차원 수를 맞춥니다. 크기가 1인 차원은 다른 배열의 해당 차원 크기에 맞게 반복됩니다. 차원 크기가 다른 배열 중 하나가 1보다 크면 에러가 발생합니다

### pandas quiz

1. x = pd.Series([1, 2, 3, 4, 5]), y = pd.Series([11, 8, 7, 5, 6]) 일때 np.linalg.norm(x-y, ord = 1) 는 뭔가 → 22

2. exam_data라는 배열인데 배열안에 시험 과목과 점수가 짝이 맞춰져있음 그리고 labels 라고 또 배열이 하나 더 있음 이럴때, df = pd.DataFrame(exam_data, index = labels), df.iloc[[1, 3, 5, 6], [1, 3]] 은 무엇인가 → iloc[ 행인덱스, 열인덱스] 여기서 인덱스 값은 리스트 형태로 들어갈 수 있음(슬라이싱 가능) pd.merge(data1, data2, on = ‘student_id’, how = ‘inner’)

### perceptron

1. 주어진 함수 h(x) = sign(w^T x)에서, h(x)가 +1인 지역은 w^T x > 0, 즉 w0 + w1x1 + w2x2 > 0인 영역입니다. 이를 x2에 대해 정리하면 x2 > (-w1/w2)x1 - (w0/w2)가 됩니다. 마찬가지로 h(x)가 -1인 지역은 w^T x < 0, 즉 w0 + w1x1 + w2x2 < 0인 영역이므로 x2 < (-w1/w2)x1 - (w0/w2)가 됩니다. 따라서, h(x)가 +1인 영역과 -1인 영역을 구분하는 선은 x2 = ax1 + b인 형태로 나타낼 수 있고, 여기서 기울기 a는 -w1/w2이고 y절편 b는 –w0/w2입니다.

2. w = [1, 2, 3]^T 인 경우, 선의 방정식은 x2 = -(1 + 2x1)/3 입니다. 이를 그래프로 그리면 다음과 같습니다. a=-2/3, b = -1/3로 y=ax+b그래프 w = -[1, 2, 3]^T 인 경우에도 같은 방법으로 직선을 구할 수 있습니다. 선의 방정식은 (2/3)x1 + (1/3)이 되며, 그래프는 다음과 같습니다. a=2/3, b=1/3

### DataFrame concept

data=pd.DataFrame(np.arange(16).reshape(4,4), index=["London", "Paris", "Berlin", "Istanbul"],columns=["one", "two", "three", "four"])

data.iloc[[1,3],[1,2,3]] 하면 옆에서 1,3 인덱스에서 밑으로 1,2,3 인덱스 표로 만들기 ↓

|         | two | three | four |
| ------- | --- | ----- | ---- |
| paris   | 5   | 6     | 7    |
| isanbul | 13  | 14    | 15   |

### 1. 수업에서 다룬 학점 승인 예제의 학습 구성 요소를 설명합니다.

입력 𝑥 고객 신청

출력 𝑦 승인 또는 거부

목표 함수 𝑓: 𝒳 → 𝒴 이상적인 신용 승인 공식

데이터 𝑥1, 𝑦1 , . , (𝑥𝑁, 𝑦𝑁) 과거 기록

가설 𝑔: 𝒳 → 𝒴 사용 공식

### 2. 신용 승인 예제를 고려하여 퍼셉트론이 어떻게 정의되고 올바른 결정을 내리기 위해 어떻게 작동하는지 설명하시오.

1. 데이터를 수집하고 전처리합니다. 예를 들어, 수입 정보를 이산화(discretization)하여 입력값으로 사용할 수 있도록 변환하거나, 누락된 값(missing value)을 처리하는 등의 작업이 필요합니다.

2. 전처리된 데이터를 입력값으로 사용하여 퍼셉트론 모델을 초기화합니다. 이때, 가중치와 편향은 무작위로 초기화됩니다.

3. 입력값을 모델에 입력하고, 모델이 예측한 결과와 실제 결과를 비교하여 오차를 계산합니다.

4. 오차를 이용하여 모델의 가중치와 편향을 조정합니다. 이때, 학습률(learning rate)이라는 하이퍼파라미터(hyperparameter)를 사용하여 조정의 정도를 결정합니다.

5. 모든 데이터에 대해 3~4 과정을 반복합니다. 이러한 과정을 하나의 epoch이라고 부릅니다.

6. 일정한 epoch 수 또는 일정한 성능 기준에 도달할 때까지 3~5 과정을 반복합니다.

7. 모델의 최종 가중치와 편향을 사용하여 새로운 입력값에 대한 예측을 수행합니다.

### 3. 다양한 학습이 있는데 신용 승인 문제는 어떤 유형의 학습에 해당하는지 해당 학습의 구성 요소와 그 관계를 설명한다.

#### Supervised Learning (지도 학습)

학습 데이터에 레이블이 포함되어 있으며, 레이블을 예측하는 모델을 학습하는 기법입니다.

예측해야 할 결과값이 이미 주어진 경우, 이를 기반으로 학습이 이루어집니다.

예측이 가능한 상황에서 많이 사용됩니다. (ex. 분류, 회귀 등)

#### Unsupervised Learning (비지도 학습)

학습 데이터에 레이블이 없으며, 데이터에서 패턴을 찾아내는 모델을 학습하는 기법입니다.

데이터의 구조나 특성을 파악하기 위해 많이 사용됩니다.

#### Reinforcement Learning (강화 학습)

에이전트라는 존재가 환경과 상호작용하며 보상을 최대화하는 방향으로 학습하는 기법입니다.

예측이 어렵고 보상이 확실하지 않은 상황에서 많이 사용됩니다.

### PLA 작동 방식

\- 퍼셉트론은 다음을 구현합니다. ℎ 𝑥 = 𝑠ign(𝒘^𝑇𝒙)

\- 훈련 세트가 주어지면 𝒙1, 𝑦1 , 𝒙2, 𝑦2 , ... (𝒙𝑁, 𝑦𝑁)

\- PLA는 잘못 분류된 점을 선택하고𝑠ign 𝒘𝑇𝒙 ≠ 𝑦𝑛 를 선택하고 가중치 벡터를 업데이트합니다: 𝒘 𝑡 + 1 = 𝒘 𝑡 + 𝑦 𝑡 𝒙(𝑡)
