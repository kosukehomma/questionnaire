import { useForm } from 'react-hook-form';

export default function Question5() {
  const { register, formState: { errors } } = useForm();
  return (
    <div>
      <span>Q5. 今まで学習したことのあるプログラミング言語をすべて教えてください。</span>
      <input
        id="allLearning1"
        {...register("allLearning", { required: true })}
        name="allLearning"
        type="checkbox"
        value="javascript"
        
      />
      <label htmlFor="allLearning1">JavaScript</label>
      <input
        id="allLearning2"
        {...register("allLearning", { required: true })}
        name="allLearning"
        type="checkbox"
        value="PHP"
        
      />
      <label htmlFor="allLearning2">PHP</label>
      <input
        id="allLearning3"
        {...register("allLearning", { required: true })}
        name="allLearning"
        type="checkbox"
        value="Ruby"
        
      />
      <label htmlFor="allLearning3">Ruby</label>
      {errors.allLearning?.type === 'required' && <p role="alert">どれか一つを選択してください</p>}
    </div>
  )
}