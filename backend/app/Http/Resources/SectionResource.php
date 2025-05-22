<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SectionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'featured_image' => $this->featured_image ? asset('storage/' . $this->featured_image) : null,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'articles_count' => $this->when(isset($this->articles_count), $this->articles_count),
            'articles' => ArticleResource::collection($this->whenLoaded('articles')),
        ];
    }
}
