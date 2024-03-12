import { Customer } from "../types/customer";
import { PathDto, Position } from "../types/path";

export function customersToPath(customers: Customer[]): PathDto {
  return customers.map((customer) => ({
    name: customer.name,
    position: {
      x: customer.positionx,
      y: customer.positiony,
    },
  }));
}

function calculateDistance(a: Position, b: Position): number {
  return Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);
}

// Nearest neighbor algorithm to calculate the route
export function calculatePath(customers: PathDto): PathDto {
  const start: Position = { x: 0, y: 0 }; // Company located at (0,0)
  let currentPos = start;
  const visited: PathDto = [{ name: "Company", position: start }]; // Start the route at the company
  const toVisit = [...customers]; // Unvisited customers

  while (toVisit.length > 0) {
    // Find the nearest unvisited customer
    let nearestIndex = 0;
    let nearestDistance = calculateDistance(currentPos, toVisit[0].position);

    for (let i = 1; i < toVisit.length; i++) {
      const distance = calculateDistance(currentPos, toVisit[i].position);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = i;
      }
    }

    // Mark the nearest customer as visited and update the current position
    visited.push(toVisit[nearestIndex]);
    currentPos = toVisit[nearestIndex].position;
    toVisit.splice(nearestIndex, 1); // Remove the nearest customer from the list of unvisited
  }

  // Add the starting point at the end of the route to return to the company
  visited.push({ name: "Company", position: start });

  return visited;
}
