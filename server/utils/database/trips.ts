import { Trip, TripExtended } from "~/types/trip";
import { useDatabase } from "../database";
import { normalizeDate } from "~/util/util";

export async function get_trips(
  db: ReturnType<typeof useDatabase>,
  page: number,
  perPage: number = 10
) {
  const result =
    await db.sql`SELECT * FROM get_paginated_trips(${page}, ${perPage})`;
  const rows = result.rows as TripExtended[];

  return Promise.all(
    rows.map(async (row) => {
      row.date_start = normalizeDate(row.date_start.toString())!;
      row.date_end = normalizeDate(row.date_end.toString())!;

      return row as Trip;
    })
  );
}

export async function get_trips_total(db: ReturnType<typeof useDatabase>) {
  const result = await db.sql`SELECT COUNT(*) FROM komandirovki`;
  // @ts-expect-error
  return parseInt(result.rows[0].count);
}

export async function get_trip(db: ReturnType<typeof useDatabase>, id: number) {
  const result = await db.sql`SELECT * FROM komandirovki WHERE id=${id}`;
  const row = result.rows![0] as Trip;
  row.date_start = normalizeDate(row.date_start.toString())!;
  row.date_end = normalizeDate(row.date_end.toString())!;
  return row;
}

export async function create_trip(
  db: ReturnType<typeof useDatabase>,
  trip: Trip
) {
  const result =
    await db.sql`INSERT INTO komandirovki (fio, date_start, date_end) VALUES (
      ${trip.fio}, ${trip.date_start as string}, 
      ${trip.date_end as string}) RETURNING id`;
  return parseInt(result.rows![0].id as string);
}
