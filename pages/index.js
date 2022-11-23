import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Container from '@material-ui/core/Container'
import Input from '@material-ui/core/Input'
import Question5 from '../components/Question5'
import firebase from '../config/firebase'

export default function Home() {
  const { register, handleSubmit, formState: { errors }, control, watch } = useForm();
  const watchIsLearning = watch("isLearning")
  const watchWasLearning = watch("wasLearning")

  const [questionnaire, setQuestionnaire] = useState(null);


  const onSubmit = (data) => {
    console.log(data);
    firebase.firestore().collection('questionnaire').add({
      // allLearning: data.allLearning,
      birth: data.birth,
      isLearning: data.isLearning,
      name: data.name,
      wasLearning: data.wasLearning
    })
  }

  useEffect(() => {
    firebase.firestore().collection('questionnaire')
      .onSnapshot((snapshot) => {
        const questionnaire = snapshot.docs.map(doc => {
          return doc.data()
        })

        setQuestionnaire(questionnaire);
      })
  }, [])

  return (
    <>
      <Container>
        <h1>プログラミング学習に関するアンケート</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="name">Q1. 名前を入力してください（匿名可）。</label>
            <Controller
              name="name"
              defaultValue=""
              control={control}
              render={({field: { value, onChange }}) => <Input value={value} onChange={onChange} />}
            />
          </div>

          <div>
            <label htmlFor="birth">Q2. 生年月日を入力してください。（例：19900101）※必須項目</label>
            <Controller
              name="birth"
              defaultValue=""
              control={control}
              rules={{ required: true, pattern: /^[0-9]{8}$/ }}
              render={({field: { value, onChange }}) => <Input value={value} onChange={onChange} />}
            />
            {errors.birth?.type === 'required' && <span role="alert">生年月日は必須項目です</span>}
            {errors.birth?.type === 'pattern' && <span role="alert">西暦で8桁で入力してください</span>}
          </div>

          <div>
            <span>Q3. 現在、プログラミングを学習していますか？</span>
            <input
              id="isLearning1"
              {...register("isLearning", { required: true })}
              name="isLearning"
              type="radio"
              value="yes"
            />
            <label htmlFor="isLearning1">はい</label>

            <input
              id="isLearning2"
              {...register("isLearning", { required: true })}
              name="isLearning"
              type="radio"
              value="no"
            />
            <label htmlFor="isLearning2">いいえ</label>

            <input
              id="isLearning3"
              {...register("isLearning", { required: true })}
              name="isLearning"
              type="radio"
              value="noComment"
            />
            <label htmlFor="isLearning3">わからない</label>
            {errors.isLearning?.type === 'required' && <p role="alert">どれかを選択してください</p>}
          </div>

          <div>
            <span>Q4. これまでに、プログラミングを学習したことがありますか？</span>
            <input
              id="wasLearning1"
              {...register("wasLearning", { required: true })}
              name="wasLearning"
              type="radio"
              value="yes"
            />
            <label htmlFor="wasLearning1">はい</label>
            <input
              id="wasLearning2"
              {...register("wasLearning", { required: true })}
              name="wasLearning"
              type="radio"
              value="no"
            />
            <label htmlFor="wasLearning2">いいえ</label>
            <input
              id="wasLearning3"
              {...register("wasLearning", { required: true })}
              name="wasLearning"
              type="radio"
              value="noComment"
            />
            <label htmlFor="wasLearning3">わからない</label>
            {errors.wasLearning?.type === 'required' && <p role="alert">どれかを選択してください</p>}
          </div>
          {(watchIsLearning === "yes" || watchWasLearning === "yes") && <Question5 />}

          <input
            type="submit"
            value="アンケートを提出する"
          />
        </form>
      </Container>
    </>
  )
}
