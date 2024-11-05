import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Subscriber, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');
  private destroyRef = inject(DestroyRef);
  private placesService=inject(PlacesService)

  ngOnInit(): void {
    this.isFetching.set(true);
    const sub = this.placesService.loadAvailablePlaces()
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (error) => {
          console.log(error);
          this.error.set(error.message);
        },
        complete: () => {
          this.isFetching.set(true);
        },
      });
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }

  onSelectPlace(selectedPlace: Place) {
    const sub = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next:(resData)=>{
        console.log(resData);
      }
    })
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}
