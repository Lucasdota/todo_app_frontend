export default interface Todos {
  id: number;
  name: string;
  description: string;
  done: boolean;
  user_id: number | null;
}