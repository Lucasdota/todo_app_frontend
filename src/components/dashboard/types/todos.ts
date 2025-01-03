export default interface Todos {
  id: Number;
  name: string;
  description: string;
  done: boolean;
  user_id: number | null;
}