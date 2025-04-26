export interface IUser {
  uid: string;
  name: string;
  email: string;
  phone?: string;

  totalAverageWeightRatings?: number;
  numberOfRents?: number;
  recentlyActive?: number;

  createdAt: FirebaseFirestore.Timestamp;
}
